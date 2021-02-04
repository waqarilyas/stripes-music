# Music App

### Clone repository

```shell
git clone https://github.com/MusicAppCP/musicapp.git`
```

### Install dependencies

Navigate into the project folder and run the following command

```shell
npm install
```

In order to remove picture in picture from IOS, place the following line in RCTVideo.m line Number:159
viewController.allowsPictureInPicturePlayback = false;

### Install iOS depdencies using pods

Navigate into the ios folder and run the following command

```shell
cd ios && pods install && cd ..
```

### Run on Android

Navigate back to project folder and run the following command to run on Android

```shell
npx react-native run-android
```

### OR

### Run on iOS

Navigate back to project folder and run the following command to run on iOS

```shell
npx react-native run-iOS
```
