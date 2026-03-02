import random

def predict_soil(n, p, k, ph, temp, humidity):
    """
    Dummy logic.
    Later replace with ML model.
    """

    crops = ["Rice", "Wheat", "Maize", "Cotton", "Sugarcane"]
    fertility_levels = ["Low", "Medium", "High"]

    predicted_crop = random.choice(crops)
    fertility = random.choice(fertility_levels)

    return predicted_crop, fertility