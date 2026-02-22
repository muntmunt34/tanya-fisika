import asyncio
import edge_tts
from flask import Flask, request, send_file
import io

app = Flask(__name__)

async def generate_audio(text, voice, rate, pitch):
    communicate = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch)
    audio_data = b""
    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            audio_data += chunk["data"]
    return audio_data

@app.route('/api/tts', methods=['POST'])
def tts():
    data = request.json
    text = data.get('text', '')
    voice = data.get('voice', 'id-ID-ArdiNeural')
    rate = data.get('rate', '-5%')
    pitch = data.get('pitch', '-10Hz')

    if not text:
        return {"error": "text is required"}, 400

    try:
        # Run the async function synchronously within the Flask route
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        audio_bytes = loop.run_until_complete(generate_audio(text, voice, rate, pitch))
        
        return send_file(
            io.BytesIO(audio_bytes),
            mimetype="audio/mpeg",
            as_attachment=True,
            download_name="tts.mp3"
        )
    except Exception as e:
        print(f"Error generating TTS: {e}")
        return {"error": str(e)}, 500

if __name__ == '__main__':
    print("Python TTS server running on port 3001")
    app.run(port=3001)
