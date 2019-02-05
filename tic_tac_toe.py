# Incomplete

import random

print('This is the classic Tic-Tac-Toe game.')
print('First, you will pick whether you want to be X or O.')
user_side = input('Do you want to be x or o: ')
if user_side == 'x':
    print('You are x and the computer is o.')
    user_side == 'x'
elif user_side == 'o':
    print('You are o and the computer is x.')
    user_side == 'o'
else:
    print('Yeah, it is x or o not some random thing you just picked. You are now o and the computer is x.')
    user_side = 'o'
print('Second, you will pick heads or tails to see who goes first. It is random.')

coin_flip = ['heads', 'tails']
user_coin_pick = input('Please pick heads or tails: ')
coin_pick = random.choice(coin_flip)

if user_coin_pick == coin_pick:
    print('You win the coin flip. You go first.')
elif user_coin_pick == 'heads' and coin_pick == 'tails':
    print('You lost the coin flip. The computer goes first.')
elif user_coin_pick == 'tails' and coin_pick == 'heads':
    print('You lost the coin flip. The computer goes first.')
else:
    print('A coin only has two sides and I have no idea what side you just picked. So, congrats! You lose!')

print('Third, your game board/grid is below:')
# overscore or overline = \u0305
# underscore or underline = \u0332
print('*************************')
print('|0\u0305|1\u0305|2\u0305|')
print('|3\u0305|4\u0305|5\u0305|')
print('|6\u0305\u0332|7\u0305\u0332|8\u0305\u0332|')
print('*************************')
print('You will pick from numbers 0-8 to figure out where you want to place your X or O.')

def winning_combo(c, n):
    # Horizontal wins
    if c[0] == n and c[1] == n and c[2] == n: return 1
    if c[3] == n and c[4] == n and c[5] == n: return 1
    if c[6] == n and c[7] == n and c[8] == n: return 1
    # Verticle wins
    if c[0] == n and c[3] == n and c[6] == n: return 1
    if c[1] == n and c[4] == n and c[7] == n: return 1
    if c[2] == n and c[5] == n and c[8] == n: return 1
    # Cross wins
    if c[0] == n and c[4] == n and c[8] == n: return 1
    if c[2] == n and c[4] == n and c[6] == n: return 1

    return 0

def print_game_grid(grid):
    for i in range(3):
        print("\t".join(grid[(i*3):(i*3+3)]))

game_grid = ['_', '_', '_', '_', '_', '_', '_', '_', '_']
comp_selection = ['0', '1', '2', '3', '4', '5', '6', '7', '8']
user_wins = 0
comp_wins = 0

while user_wins == 0 or comp_wins == 0:
    if user_side == 'o':
        comp_side == 'x'
        user_grid_selection = int(input('Where would you like to place your o: '))
        if game_grid[user_grid_selection] != '_':
            user_grid_selection = int(input('Spot is already taken pick another: '))
            computer_grid_selection = int(random.choice(comp_selection))
            for j in game_grid:
                if game_grid[computer_grid_selection] == 'o':
                    computer_grid_selection = int(random.choice(comp_selection))
                else:
                    game_grid[computer_grid_selection] = 'x'
            print_game_grid(game_grid)
            user_wins = winning_combo(game_grid, user_side)
            comp_wins = winning_combo(game_grid, comp_side)
        elif game_grid[user_grid_selection] == 'o':
            user_grid_selection = int(input('Spot is already taken pick another: '))
            computer_grid_selection = int(random.choice(comp_selection))
            for j in game_grid:
                if game_grid[computer_grid_selection] == 'o':
                    computer_grid_selection = int(random.choice(comp_selection))
                else:
                    game_grid[computer_grid_selection] = 'x'
            print_game_grid(game_grid)
            user_wins = winning_combo(game_grid, user_side)
            comp_wins = winning_combo(game_grid, comp_side)
        elif game_grid[user_grid_selection] == 'x':
            user_grid_selection = int(input('Spot is already taken pick another: '))
            computer_grid_selection = int(random.choice(comp_selection))
            for j in game_grid:
                if game_grid[computer_grid_selection] == 'o':
                    computer_grid_selection = int(random.choice(comp_selection))
                else:
                    game_grid[computer_grid_selection] = 'x'
            print_game_grid(game_grid)
            user_wins = winning_combo(game_grid, user_side)
            comp_wins = winning_combo(game_grid, 'x')
        elif game_grid[user_grid_selection] == '_':
            game_grid[user_grid_selection] = 'o'
            computer_grid_selection = int(random.choice(comp_selection))
            for j in game_grid:
                if game_grid[computer_grid_selection] == 'o':
                    computer_grid_selection = int(random.choice(comp_selection))
                else:
                    game_grid[computer_grid_selection] = 'x'
            print_game_grid(game_grid)
            user_wins = winning_combo(game_grid, user_side)
            comp_wins = winning_combo(game_grid, comp_side)
    elif user_side == 'x':
        user_grid_selection = int(input('Where would you like to place your x: '))
        if game_grid[user_grid_selection] != '_':
            user_grid_selection = int(input('Spot is already taken pick another: '))
        elif game_grid[user_grid_selection] == 'o':
            user_grid_selection = int(input('Spot is already taken pick another: '))
        elif game_grid[user_grid_selection] == 'x':
            user_grid_selection = int(input('Spot is already taken pick another: '))
        elif game_grid[user_grid_selection] == '_':
            game_grid[user_grid_selection] = 'x'
            computer_grid_selection = int(random.choice(comp_selection))
            for j in game_grid:
                if game_grid[computer_grid_selection] == 'o':
                    computer_grid_selection = int(random.choice(comp_selection))
                else:
                    game_grid[computer_grid_selection] = 'o'
            print_game_grid(game_grid)
        user_wins = winning_combo(game_grid, user_side)
        comp_wins = winning_combo(game_grid, user_side)
    else:
        print('Do not be cute. Just enter ', user_side)

if user_wins == 1:
    print('You won!')
elif comp_wins == 1:
    print('I win!')
