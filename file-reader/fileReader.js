import { readFileSync, writeFileSync } from "fs";
import path from "path";

export function readMyFile(filename = "content-mock.json") {
  const filePath = path.join(process.cwd(), "file-reader", filename);
  const fileContents = readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

export function writeINFile(filename = "content-mock.json", data) {
  const filePath = path.join(process.cwd(), "file-reader", filename);
  const fileContents = JSON.stringify(data);
  return writeFileSync(filePath, fileContents, "utf8");
}

export function getUserDataFromFile() {
  const allRecords = readMyFile();
  return [...allRecords.users];
}

export function getAllGiftCardsList() {
  const allRecords = readMyFile();
  return [...allRecords.giftCards];
}

export function saveCardList(cardList) {
  const allRecords = readMyFile();
  allRecords.giftCards = [
    ...allRecords.giftCards,
    { ...cardList, id: allRecords.giftCards.length + 1 },
  ];
  writeINFile("content-mock.json", allRecords);
}

export function removeCard(id) {
  const allRecords = readMyFile();
  allRecords.giftCards = allRecords.giftCards.filter(
    (card) => Number(card.id) !== Number(id)
  );
  writeINFile("content-mock.json", allRecords);
}

export function updateCardInFileSystem(card) {
  const allRecords = readMyFile();
  allRecords.giftCards = allRecords.giftCards.map((item) => {
    if (Number(item.id) === Number(card.id)) {
      return card;
    }
    return item;
  });
  writeINFile("content-mock.json", allRecords);
}

export const getAskedNumberOfRecords = (number) => {
  const allRecords = readMyFile();
  return allRecords.giftCards.slice(0, number);
};

export const getCardById = (id) => {
  const allRecords = readMyFile();
  return allRecords.giftCards.find((card) => Number(card.id) === Number(id));
};

export const getCurrentAccountCards = (email, status) => {
  const allRecords = readMyFile();
  if (status === "received") {
    return allRecords.giftTransact.filter(
      (transact) => transact.receiverEmail === email
    );
  }
  return allRecords.giftTransact.filter(
    (transact) => transact.senderEmail === email
  );
};

export const saveAccountCards = (cardObject) => {
  const allRecords = readMyFile();
  allRecords.giftTransact = [
    ...allRecords.giftTransact,
    { ...cardObject, id: allRecords.giftTransact.length + 1 },
  ];
  writeINFile("content-mock.json", allRecords);
};

export const updateUserDetails = (id, user) => {
  const allRecords = readMyFile();
  allRecords.users = allRecords.users.map((item) => {
    if (Number(item.id) === Number(id)) {
      return user;
    }
    return item;
  });
  writeINFile("content-mock.json", allRecords);
};
