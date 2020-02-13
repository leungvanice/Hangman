from random_word import RandomWords
r = RandomWords()


def create():

    randomWord = r.get_random_word(maxLength=6)
    return randomWord


print(create())
