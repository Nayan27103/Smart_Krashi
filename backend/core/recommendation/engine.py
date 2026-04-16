def recommend_crop(n, p, k, ph, temp, humidity, rainfall=None):
    """
    Simulates a logic similar to typical ML models (like Random Forest) 
    trained on agricultural datasets.
    """
    
    # Defaults if missing
    rainfall = rainfall if rainfall is not None else 100

    # Logic based on common crop requirements
    if humidity > 80 and rainfall > 200:
        return "Rice", "Rice requires high water (rainfall > 200mm) and humidity (> 80%). High nitrogen (N) also helps grain yield."
    
    if 25 <= temp <= 35 and 50 <= humidity <= 65 and rainfall < 100:
        return "Maize", "Maize thrives in moderate humidity and warmer temperatures. It's relatively drought-resistant compared to rice."
    
    if n > 80 and p > 40 and k > 40 and 15 <= temp <= 25:
        return "Wheat", "Wheat prefers cooler climates (15-25°C) and balanced, high nutrient levels (N, P, K)."
    
    if ph < 5.5 and humidity > 70:
        return "Coffee", "Coffee plants prefer acidic soil (pH < 5.5) and high humidity."
    
    if temp > 28 and p > 50 and k > 50:
        return "Cotton", "Cotton requires higher Phosphorus (P) and Potassium (K) and warmer temperatures for fiber development."
    
    if ph > 7.0 and rainfall < 70:
        return "Chickpea", "Chickpeas are well-suited for alkaline soil (pH > 7) and semi-arid conditions with low rainfall."
    
    if humidity < 40 and temp > 30:
        return "Mung Bean", "Mung beans are highly drought-tolerant and prefer dry, hot climates."

    # Fallback
    return "Maize", "General-purpose crop suitable for your current soil parameters. Consider adding more organic nitrogen for better yield."

def get_fertility_status(n, p, k):
    score = (n / 100) + (p / 50) + (k / 50)
    if score > 2.5: return "Excellent"
    if score > 1.5: return "Good"
    return "Moderate"

def get_ph_status(ph):
    if ph < 6.0: return "Acidic"
    if 6.0 <= ph <= 7.5: return "Neutral/Ideal"
    return "Alkaline"

def get_actions(crop, ph):
    actions = ["Ensure proper irrigation based on growth stage."]
    if ph < 6.0: actions.append("Add lime to soil to increase pH.")
    if ph > 7.5: actions.append("Add gypsum or organic matter to lower pH.")
    
    if crop == "Rice": actions.append("Maintain standing water in the field.")
    elif crop == "Wheat": actions.append("Monitor for rust disease during winter.")
    
    return actions