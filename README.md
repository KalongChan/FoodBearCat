# FoodBearCat

A fullstack food ordering website build with Next.js, Redux and MongoDB

# Screenshot
![ezgif-1-d3de620484](https://user-images.githubusercontent.com/82305211/222653683-15572532-1dc9-4d12-9f59-2a94b14ee4a8.gif)
![ezgif-2-7cdadf8381](https://user-images.githubusercontent.com/82305211/222675400-b21fa9ff-cdbf-4374-954a-b33d6a427759.gif)


# Demo
<a href="https://food-bear-cat.vercel.app/" target="_blank">Click me</a> to view the demo

Login the account below and gain access to WebPanel
<ul>
<li>Username: admin</li>
<li>Password: admin</li>
</ul>

# Features
<ul>
<li>Responsive Web Design</li>
<li>Fully functional register and login system</li>
<li>User authentication with NextAuth.js</li>
<li>WebPanel with basic CRUD functions on products, accounts and order records with REST API</li>
<li>Check order status in real time</li>
</ul>

# Run Locally

Run git clone
```bash
  git clone https://github.com/KalongChan/FoodBearCat.git
```

Install dependencies

```bash
  npm install  --legacy-peer-deps
```

Create a **.env** file inside project directory with fields given below.

```bash
# Mongodb 
# DB name
MONGODB_DB= #Your Mongodb collection name

# Monogdb connection url 
MONGODB_URI= #Your Mongodb connection url
```

Insert dummy data into MongoDB

```bash
  cd src/util
  node mongodbHelper.js
  node accountHelper.js
  cd ../..
```


Start the server

```bash
  npm run dev
```
