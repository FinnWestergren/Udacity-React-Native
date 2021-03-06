import { AsyncStorage } from 'react-native';

const DECK_STORAGE_KEY = "Udacicards:decks";

export const initializeDecks = () => {
    return AsyncStorage.setItem(DECK_STORAGE_KEY, "{}");
}

export const clearDecks = () => {
    return AsyncStorage.removeItem(DECK_STORAGE_KEY);
};

export const getDecks = () => {
    return AsyncStorage.getItem(DECK_STORAGE_KEY);
};

export const getDeck = async (id) => {
    const decks = await getDecks();
    if(!decks) return null;
    return JSON.parse(decks)[id]
};

export const addDeck = async (id) => {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [id]: {date: new Date(), questions: []}
    }));
};

export const addCardToDeck = (title, card, index, replace) => {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => {
        const data = JSON.parse(results);
        data[title].questions.splice(index, (replace ? 1 : 0), card);
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data));
    });
};

export const removeDeck = (id) => {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => {
        const data = JSON.parse(results);
        data[id] = undefined;
        delete data[id];
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data));
    });
};

export const removeCardFromDeck = (deckId, cardIndex) => {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => {
        const data = JSON.parse(results);
        data[deckId].questions.splice(cardIndex, 1);
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data));
    });
};
