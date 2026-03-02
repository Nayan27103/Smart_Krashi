def recommend_crop(n, p, k, ph, temp, humidity):
    """
    Simple rule-based intelligent crop recommendation.
    Later replace with ML model.
    """

    if humidity > 70 and n > 80:
        return "Rice", "High humidity and nitrogen levels are ideal for rice."

    if ph < 6.0:
        return "Potato", "Slightly acidic soil is good for potato."

    if temp > 30 and k > 40:
        return "Cotton", "Warm temperature and potassium support cotton growth."

    if n > 60 and p > 40:
        return "Wheat", "Balanced nitrogen and phosphorus support wheat."

    return "Maize", "Moderate conditions suitable for maize."