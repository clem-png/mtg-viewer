export async function fetchAllCards(i = null) {
    let response;
    if (i === null) {
        response = await fetch('/api/card/all');
    } else {
        response = await fetch(`/api/card/all?page=${i}`);
    }
    if (!response.ok) throw new Error('Failed to fetch cards');
    return await response.json();
}

export async function fetchCard(uuid) {
    const response = await fetch(`/api/card/${uuid}`);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error('Failed to fetch card');
    const card = await response.json();
    card.text = card.text.replaceAll('\\n', '\n');
    return card;
}

export async function fetchPageCards(i) {
    const response = await fetch('/api/card/all?page=${i}');
    if (!response.ok) throw new Error('Failed to fetch cards');
    return await response.json();
}