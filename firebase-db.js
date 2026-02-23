// =====================================================
// FIREBASE DATABASE WRAPPER — Tanya Fisika
// =====================================================
// Provides a clean API for all database operations.
// Load AFTER firebase-config.js
//
// Usage:
//   DB.auth.signUp(email, password, name, role)
//   DB.auth.signIn(email, password)
//   DB.auth.signOut()
//   DB.auth.onAuthChanged(callback)
//   DB.auth.getCurrentUser()
//
//   DB.tasks.create({ title, desc, due })
//   DB.tasks.getAll(callback)       ← real-time listener
//   DB.tasks.delete(taskId)
//
//   DB.submissions.submit(taskId, { note, fileName })
//   DB.submissions.getByTask(taskId, callback)
//
//   DB.forum.createPost({ author, content })
//   DB.forum.getPosts(callback)

const DB = (() => {
    'use strict';

    // ─── AUTH ───────────────────────────────────────────
    const authModule = {

        // Sign up with email/password + save profile to Firestore
        async signUp(email, password, name, role) {
            try {
                const cred = await auth.createUserWithEmailAndPassword(email, password);
                const uid = cred.user.uid;

                // Save user profile to Firestore
                await db.collection('users').doc(uid).set({
                    name: name,
                    email: email.toLowerCase(),
                    role: role || 'siswa',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });

                // Also update displayName
                await cred.user.updateProfile({ displayName: name });

                // Keep localStorage in sync for backward compatibility
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userName', name);
                localStorage.setItem('userEmail', email.toLowerCase());
                localStorage.setItem('userRole', role || 'siswa');
                localStorage.setItem('userId', uid);
                sessionStorage.setItem('userLoggedIn', 'true');
                sessionStorage.setItem('userName', name);
                sessionStorage.setItem('userEmail', email.toLowerCase());
                sessionStorage.setItem('userRole', role || 'siswa');
                sessionStorage.setItem('userId', uid);

                console.log('[DB.auth] Sign up success:', email);
                return { success: true, user: cred.user };
            } catch (error) {
                console.error('[DB.auth] Sign up error:', error);
                return { success: false, error: error.message, code: error.code };
            }
        },

        // Sign in with email/password
        async signIn(email, password) {
            try {
                const cred = await auth.signInWithEmailAndPassword(email, password);
                const uid = cred.user.uid;

                // Fetch user profile from Firestore
                const doc = await db.collection('users').doc(uid).get();
                const profile = doc.exists ? doc.data() : {};

                const name = profile.name || cred.user.displayName || email.split('@')[0];
                const role = profile.role || 'siswa';

                // Keep localStorage in sync
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userName', name);
                localStorage.setItem('userEmail', email.toLowerCase());
                localStorage.setItem('userRole', role);
                localStorage.setItem('userId', uid);
                sessionStorage.setItem('userLoggedIn', 'true');
                sessionStorage.setItem('userName', name);
                sessionStorage.setItem('userEmail', email.toLowerCase());
                sessionStorage.setItem('userRole', role);
                sessionStorage.setItem('userId', uid);

                console.log('[DB.auth] Sign in success:', email);
                return { success: true, user: cred.user, profile };
            } catch (error) {
                console.error('[DB.auth] Sign in error:', error);
                return { success: false, error: error.message, code: error.code };
            }
        },

        // Sign out
        async signOut() {
            try {
                await auth.signOut();
                // Clear localStorage auth data
                ['userLoggedIn', 'userName', 'userEmail', 'userRole', 'userId'].forEach(k => {
                    localStorage.removeItem(k);
                    sessionStorage.removeItem(k);
                });
                console.log('[DB.auth] Signed out');
                return { success: true };
            } catch (error) {
                console.error('[DB.auth] Sign out error:', error);
                return { success: false, error: error.message };
            }
        },

        // Listen for auth state changes (auto-login detection)
        onAuthChanged(callback) {
            return auth.onAuthStateChanged(async (user) => {
                if (user) {
                    // User is signed in — fetch profile
                    try {
                        const doc = await db.collection('users').doc(user.uid).get();
                        const profile = doc.exists ? doc.data() : {};
                        callback(user, profile);
                    } catch (e) {
                        callback(user, {});
                    }
                } else {
                    callback(null, null);
                }
            });
        },

        // Get current user (sync)
        getCurrentUser() {
            return auth.currentUser;
        },

        // Get current user's UID
        getUid() {
            return auth.currentUser ? auth.currentUser.uid : null;
        }
    };

    // ─── TASKS / ASSIGNMENTS ───────────────────────────
    const tasksModule = {

        // Create a new task (guru only)
        async create({ title, desc, due, classId }) {
            const user = auth.currentUser;
            if (!user) throw new Error('Not authenticated');

            const taskData = {
                title: title || 'Tugas Baru',
                desc: desc || '',
                due: due || '',
                classId: classId || 'physics_101',
                createdBy: user.uid,
                createdByName: user.displayName || localStorage.getItem('userName') || 'Guru',
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            const ref = await db.collection('assignments').add(taskData);
            console.log('[DB.tasks] Created:', ref.id);

            // Also save to localStorage for backward compatibility
            try {
                const local = JSON.parse(localStorage.getItem('classTasks') || '{}');
                local[ref.id] = { id: ref.id, ...taskData };
                localStorage.setItem('classTasks', JSON.stringify(local));
            } catch (e) { }

            return { id: ref.id, ...taskData };
        },

        // Get all tasks — real-time listener
        // callback receives array of tasks whenever data changes
        getAll(callback, classId) {
            const cid = classId || 'physics_101';
            return db.collection('assignments')
                .where('classId', '==', cid)
                .orderBy('createdAt', 'desc')
                .onSnapshot((snapshot) => {
                    const tasks = [];
                    snapshot.forEach(doc => {
                        tasks.push({ id: doc.id, ...doc.data() });
                    });
                    console.log('[DB.tasks] Received', tasks.length, 'tasks');
                    callback(tasks);
                }, (error) => {
                    console.error('[DB.tasks] Listen error:', error);
                    // Fallback to localStorage
                    try {
                        const local = JSON.parse(localStorage.getItem('classTasks') || '{}');
                        callback(Object.values(local));
                    } catch (e) {
                        callback([]);
                    }
                });
        },

        // Get all tasks once (no listener)
        async getAllOnce(classId) {
            const cid = classId || 'physics_101';
            try {
                const snap = await db.collection('assignments')
                    .where('classId', '==', cid)
                    .orderBy('createdAt', 'desc')
                    .get();
                const tasks = [];
                snap.forEach(doc => tasks.push({ id: doc.id, ...doc.data() }));
                return tasks;
            } catch (error) {
                console.error('[DB.tasks] Fetch error:', error);
                // Fallback to localStorage
                try {
                    return Object.values(JSON.parse(localStorage.getItem('classTasks') || '{}'));
                } catch (e) { return []; }
            }
        },

        // Delete a task
        async delete(taskId) {
            try {
                await db.collection('assignments').doc(taskId).delete();
                console.log('[DB.tasks] Deleted:', taskId);

                // Also remove from localStorage
                try {
                    const local = JSON.parse(localStorage.getItem('classTasks') || '{}');
                    delete local[taskId];
                    localStorage.setItem('classTasks', JSON.stringify(local));
                } catch (e) { }

                return { success: true };
            } catch (error) {
                console.error('[DB.tasks] Delete error:', error);
                return { success: false, error: error.message };
            }
        }
    };

    // ─── SUBMISSIONS ───────────────────────────────────
    const submissionsModule = {

        // Submit an assignment (siswa)
        async submit(taskId, { note, fileName, fileData }) {
            const user = auth.currentUser;
            if (!user) throw new Error('Not authenticated');

            const subData = {
                taskId: taskId,
                studentId: user.uid,
                studentName: user.displayName || localStorage.getItem('userName') || 'Siswa',
                studentEmail: user.email || '',
                note: note || '',
                fileName: fileName || '',
                submittedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            const ref = await db.collection('submissions').add(subData);
            console.log('[DB.submissions] Submitted:', ref.id);

            // Also save locally for backward compatibility
            try {
                const local = JSON.parse(localStorage.getItem('submissions') || '{}');
                if (!local[taskId]) local[taskId] = [];
                local[taskId].push({ ...subData, id: ref.id, time: new Date().toISOString() });
                localStorage.setItem('submissions', JSON.stringify(local));
            } catch (e) { }

            return { id: ref.id, ...subData };
        },

        // Get submissions for a specific task — real-time
        getByTask(taskId, callback) {
            return db.collection('submissions')
                .where('taskId', '==', taskId)
                .orderBy('submittedAt', 'desc')
                .onSnapshot((snapshot) => {
                    const subs = [];
                    snapshot.forEach(doc => subs.push({ id: doc.id, ...doc.data() }));
                    callback(subs);
                }, (error) => {
                    console.error('[DB.submissions] Listen error:', error);
                    callback([]);
                });
        },

        // Get all submissions by current student
        async getMySubmissions() {
            const user = auth.currentUser;
            if (!user) return [];
            try {
                const snap = await db.collection('submissions')
                    .where('studentId', '==', user.uid)
                    .get();
                const subs = [];
                snap.forEach(doc => subs.push({ id: doc.id, ...doc.data() }));
                return subs;
            } catch (e) {
                console.error('[DB.submissions] Fetch error:', e);
                return [];
            }
        }
    };

    // ─── FORUM ─────────────────────────────────────────
    const forumModule = {

        // Create a forum post
        async createPost({ content }) {
            const user = auth.currentUser;
            const author = user
                ? (user.displayName || localStorage.getItem('userName') || 'Anonim')
                : (localStorage.getItem('userName') || 'Anonim');

            const postData = {
                author: author,
                authorId: user ? user.uid : 'guest',
                content: content,
                replies: [],
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            const ref = await db.collection('forum_posts').add(postData);
            console.log('[DB.forum] Posted:', ref.id);
            return { id: ref.id, ...postData };
        },

        // Get all posts — real-time
        getPosts(callback, limit) {
            let query = db.collection('forum_posts')
                .orderBy('createdAt', 'desc');
            if (limit) query = query.limit(limit);

            return query.onSnapshot((snapshot) => {
                const posts = [];
                snapshot.forEach(doc => posts.push({ id: doc.id, ...doc.data() }));
                callback(posts);
            }, (error) => {
                console.error('[DB.forum] Listen error:', error);
                callback([]);
            });
        },

        // Add reply to a post
        async addReply(postId, { content }) {
            const user = auth.currentUser;
            const author = user
                ? (user.displayName || localStorage.getItem('userName') || 'Anonim')
                : (localStorage.getItem('userName') || 'Anonim');

            await db.collection('forum_posts').doc(postId).update({
                replies: firebase.firestore.FieldValue.arrayUnion({
                    author: author,
                    authorId: user ? user.uid : 'guest',
                    content: content,
                    createdAt: new Date().toISOString()
                })
            });
            console.log('[DB.forum] Reply added to:', postId);
        }
    };

    // ─── EXPOSE API ────────────────────────────────────
    return {
        auth: authModule,
        tasks: tasksModule,
        submissions: submissionsModule,
        forum: forumModule
    };
})();

console.log('[DB] Firebase database wrapper loaded');
