def summarize_text(text: str) -> str:
    """
    Mock text summarization helper.
    Replace with real GPT API later.
    """
    if not text:
        return "No text provided."
    words = text.split()
    if len(words) > 40:
        return "Summary: " + " ".join(words[:30]) + "..."
    return "Summary: " + text
