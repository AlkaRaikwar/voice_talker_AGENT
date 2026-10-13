@echo off
title Voice Talker Agent
echo Starting Voice Talker Agent...
echo.
echo Open http://localhost:5500 in Google Chrome.
echo Keep this window open while using the app.
echo.
python -m http.server 5500
pause
