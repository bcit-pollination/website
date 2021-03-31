---
id: website
title: Website installation instructions
---

## Pollination Admin Page:

## Quick start:
```shell
npm install
```
```shell
npm start
```

### Deployment:
```shell
npm run build
```
```shell
cd build
```
```shell
git add .
```
```shell
git commit -m"build version [i] "
```
```shell
git push
```

On nginx server:
```shell
git pull
```

### API path can be changed by going to 
/src/api_path.js
