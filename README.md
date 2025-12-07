# 🟢 AnonChan
> **Raw. Unfiltered. Anonymous.** > A modern, mobile-first imageboard client built with React Native & Expo.

<div align="center">
<img width="283" height="229" alt="image" src="https://github.com/user-attachments/assets/7f7dac83-667d-4f4f-8809-48ab19e268d9" />

</div>

<div align="center">

| **Onboarding** | **Privacy First** | **Board Browser** |
|:---:|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/3ade3521-5948-410d-8839-b282376d38a2" width="250" /> | <img src="https://github.com/user-attachments/assets/b417523d-5ac1-4f0d-ad61-18f511c4f59b" width="250" /> | <img src="https://github.com/user-attachments/assets/204bf10d-90f8-446b-b236-9bad5b05f7f6" width="250" /> |

| **Catalog Grid** | **Thread View** | **Watched Threads** |
|:---:|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/00b7c108-c489-4f96-a417-13d0c35cdf04" width="250" /> | <img src="https://github.com/user-attachments/assets/a195a80d-276a-4d32-bd14-560c0483b5d3" width="250" /> | <img src="https://github.com/user-attachments/assets/853ab21e-6a28-4477-84ba-b35abc6fb90c" width="250" /> |

<p><b>Menu / Options</b></p>
<img src="https://github.com/user-attachments/assets/0a76c009-cca0-497a-bcb3-ccb28b5eacee" width="250" />

</div>
<div align="center">

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Expo Router](https://img.shields.io/badge/Expo_Router-000000?style=for-the-badge&logo=expo&logoColor=white)](https://docs.expo.dev/router/introduction/)

</div>

---

## 📖 About The Project

**AnonChan** is a high-performance, read-write client for anonymous imageboards. Designed with a brutalist, dark-mode aesthetic, it brings the desktop imageboard experience to mobile devices without compromising on features. 

This project demonstrates advanced React Native capabilities including **complex list virtualization**, **custom navigation transitions**, **gesture handling**, and **offline persistence**.

### ✨ Key Features
* **Total Anonymity:** No accounts, no email, no tracking. purely device-ID based moderation.
* **Catalog Grid:** A dense, visual-first grid layout for browsing threads efficiently.
* **Green Text Support:** Custom parsing engine to render classic `>quote` and `>>reply` formatting correctly.
* **Thread Watcher:** Locally save and track your favorite threads with unread indicators.
* **Optimized Performance:** Uses `FlashList` and `Expo Image` for buttery smooth scrolling even with hundreds of images.
* **Brutalist UI:** A distraction-free, OLED-black interface (`#111111`) with high-contrast accents.

---

## 📱 Project Showcase

| **Onboarding** | **Privacy First** | **Board Browser** |
|:---:|:---:|:---:|
| <img src="Screenshot_1765121061.png" width="200" /> | <img src="Screenshot_1765121065.png" width="200" /> | <img src="Screenshot_1765121069.png" width="200" /> |
| *Smooth entry flow* | *No data collection* | *Organized categories* |

| **Catalog Grid** | **Thread View** | **Watched Threads** |
|:---:|:---:|:---:|
| <img src="Screenshot_1765121071.png" width="200" /> | <img src="Screenshot_1765121074.png" width="200" /> | <img src="Screenshot_1765121087.png" width="200" /> |
| *Visual browsing* | *Green text & Replies* | *Track activity* |

---

## 🛠️ Technical Stack

* **Core:** React Native, Expo SDK 50+
* **Navigation:** Expo Router (File-based routing)
* **Language:** TypeScript (Strict Mode)
* **Styling:** StyleSheet API (No heavy UI libraries)
* **Icons:** @expo/vector-icons (Material Icons)
* **Storage:** AsyncStorage / MMKV (For watched threads & settings)

---

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites
* Node.js (LTS)
* npm or yarn
* Expo Go app on your physical device OR Android Emulator/iOS Simulator

### Installation

1.  **Clone the repo**
    ```bash
    git clone [https://github.com/yourusername/anonchan.git](https://github.com/yourusername/anonchan.git)
    cd anonchan
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the server**
    ```bash
    npx expo start
    ```

4.  **Run on device**
    * Scan the QR code with the **Expo Go** app (Android/iOS).
    * Press `a` to open in Android Emulator.
    * Press `i` to open in iOS Simulator.

---

## ⚠️ Disclaimer

This is a **portfolio project** designed to showcase technical skills in mobile development. It is a client for imageboards, which typically contain user-generated content.
* The app includes moderation tools (Blocking/Reporting) to demonstrate safety compliance.
* NSFW content is hidden by default.

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

<div align="center">
  <p>Built with 💚 by [Your Name]</p>
</div>
