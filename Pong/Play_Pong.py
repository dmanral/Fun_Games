# Simple pong
# Credit: Christian Thompson (Youtube)

import turtle
import winsound
import ctypes
import os
from Pong_Build_Game import *
from Pong_Game_Play import *

# Score
score_1 = 0
score_2 = 0

# Main game loop
while True:
    wn.update()

    # Move the ball
    ball.setx(ball.xcor() +  ball.dx)
    ball.sety(ball.ycor() + ball.dy)

    # Border checking
    if ball.ycor() > 290:
        ball.sety(290)
        ball.dy *= -1
        os.system("afplay bounce.wav&")                      # MacOS
        winsound.PlaySound("bounce.wav", winsound.SND_ASYNC) # Windows
    
    if ball.ycor() < -290:
        ball.sety(-290)
        ball.dy *= -1
        os.system("afplay bounce.wav&")                      # MacOS
        winsound.PlaySound("bounce.wav", winsound.SND_ASYNC) # Windows

    if ball.xcor() > 390:
        ball.goto(0, 0)
        ball.dx *= -1
        score_1 += 1
        pen.clear()
        pen.write("Player-1: {}  Player-2: {}".format(score_1, score_2), align="center", font=("Courier", 24, "normal"))
    
    if ball.xcor() < -390:
        ball.goto(0, 0)
        ball.dx *= -1
        score_2 += 1
        pen.clear()
        pen.write("Player-1: {}  Player-2: {}".format(score_1, score_2), align="center", font=("Courier", 24, "normal"))

    # Paddle and ball collisions
    if (ball.xcor() > 340 and ball.xcor() < 350) and (ball.ycor () < paddle_b.ycor() + 40 and ball.ycor() > paddle_b.ycor() - 40):
        ball.setx(340)
        ball.dx *= -1
        os.system("afplay bounce.wav&")                      # MacOS
        winsound.PlaySound("bounce.wav", winsound.SND_ASYNC) # Windows
    
    if (ball.xcor() < -340 and ball.xcor() > -350) and (ball.ycor () < paddle_a.ycor() + 40 and ball.ycor() > paddle_a.ycor() - 40):
        ball.setx(-340)
        ball.dx *= -1
        os.system("afplay bounce.wav&")                      # MacOS
        winsound.PlaySound("bounce.wav", winsound.SND_ASYNC) # Windows

    # Winner
    if score_1 == 7 and score_2 < 7:
        ctypes.windll.user32.MessageBoxW(0, "Player-1 wins the game with a score of {} to {}".format(score_1, score_2), "Game Over!", 0)
        score_1 = 0
        score_2 = 0
        pen.clear()
        pen.write("Player-1: {}  Player-2: {}".format(score_1, score_2), align="center", font=("Courier", 24, "normal"))
    elif score_2 == 7 and score_1 < 7:
        ctypes.windll.user32.MessageBoxW(0, "Player-2 wins the game with a score of {} to {}".format(score_2, score_1), "Game Over!", 0)
        score_1 = 0
        score_2 = 0
        pen.clear()
        pen.write("Player-1: {}  Player-2: {}".format(score_1, score_2), align="center", font=("Courier", 24, "normal"))
