import random

print('*****************************************************')
print('Welcome to rock, paper, scissors!')
print('You might be wondering how this game works.')
print('First, you have to type in whether you want rock, paper, or scissors.')
print('Then, as soon as you hit enter, the computer will randomly select between rock, paper, and scissors.')
print('Finally, the computer will compare and tell you who won.')
print('This is a best out of three game.')
print('Good luck!')
print('*****************************************************')


computer_choices = ['rock', 'paper', 'scissors']

computer_wins = 0
user_wins = 0

while computer_wins < 3 and user_wins < 3:
    user_pick = input('Enter your pick and press enter: ')
    computer_pick = random.choice(computer_choices)
    if user_pick == 'rock' and computer_pick == 'paper':
        print('Computer throws: ', computer_pick)
        print('***********Computer win!***********')
        computer_wins += 1
        print('Computer wins: ', computer_wins)
        print('User wins: ', user_wins)
    elif user_pick == 'rock' and computer_pick == 'scissors':
        print('Computer throws: ', computer_pick)
        print('***********You win!***********')
        user_wins += 1
        print('Computer wins: ', computer_wins)
        print('User wins: ', user_wins)
    elif user_pick == 'paper' and computer_pick == 'rock':
        print('Computer throws: ', computer_pick)
        print('***********You win!***********')
        user_wins += 1
        print('Computer wins: ', computer_wins)
        print('User wins: ', user_wins)
    elif user_pick == 'paper' and computer_pick == 'scissors':
        print('Computer throws: ', computer_pick)
        print('***********Computer win!***********')
        computer_wins += 1
        print('Computer wins: ', computer_wins)
        print('User wins: ', user_wins)
    elif user_pick == 'scissors' and computer_pick == 'rock':
        print('Computer throws: ', computer_pick)
        print('***********Computer win!***********')
        computer_wins += 1
        print('Computer wins: ', computer_wins)
        print('User wins: ', user_wins)
    elif user_pick == 'scissors' and computer_pick == 'paper':
        print('Computer throws: ', computer_pick)
        print('***********You win!***********')
        user_wins += 1
        print('Computer wins: ', computer_wins)
        print('User wins: ', user_wins)
    elif user_pick == computer_pick:
        print('***********It is a tie!***********')
    else:
        print('The game is rock, paper, scissors not do whatever the hell you want!')

if user_wins > computer_wins:
    print('Congrats you beat the Computer!')
else:
    print('I win! I am in your head!')
