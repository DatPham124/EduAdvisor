import whisper

model = whisper.load_model("turbo")
result = model.transcribe("Speech-to-text /common_voice_vi_41912728.mp3")
print(result["text"])