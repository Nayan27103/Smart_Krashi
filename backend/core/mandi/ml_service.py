import random

def predict_price(current_price):
    """
    Dummy price prediction logic.
    Later replace with ML model.
    """

    fluctuation = random.uniform(-5, 10)  # simulate price change
    predicted = current_price + fluctuation

    return round(predicted, 2)