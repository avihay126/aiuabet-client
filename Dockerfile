# שלב 1: לבנות את האפליקציה
FROM node:18 AS build

# הגדרת תיקיית העבודה
WORKDIR /app

# העתקת קבצי package.json ו- package-lock.json
COPY package*.json ./

# התקנת התלויות
RUN npm install

# העתקת שאר הקבצים
COPY . .

# בניית האפליקציה
RUN npm run build

# שלב 2: להריץ את השרת עם React במקום Nginx
FROM node:18

# הגדרת תיקיית העבודה
WORKDIR /app

# העתקת קבצי האפליקציה
COPY --from=build /app /app

# התקנת תלויות בזמן ריצה (אם יש צורך)
RUN npm install --production

# הרצת השרת על פורט 3000
EXPOSE 3000
CMD ["npm", "start"]
