// main.js

window.addEventListener("DOMContentLoaded", () => {
  const vaultOverlay = document.querySelector(".vault-overlay");
  const leftDoor = document.querySelector(".left-door");
  const rightDoor = document.querySelector(".right-door");
  const mainContent = document.querySelector(".main-content");
  const circleLogo = document.querySelector(".vault-circle");

  // Khởi tạo trạng thái ban đầu
  mainContent.style.opacity = "0";
  mainContent.style.transition = "opacity 1.5s ease";

  // Bắt đầu animation khi trang load
  setTimeout(() => {
    leftDoor.style.transform = "translateX(-100%)";
    rightDoor.style.transform = "translateX(100%)";
    circleLogo.style.opacity = "0";
    circleLogo.style.transform = "scale(0.5)";
  }, 500);

  // Sau khi cửa mở xong thì hiện nội dung
  setTimeout(() => {
    vaultOverlay.style.display = "none";
    mainContent.style.opacity = "1";
  }, 2000); // Chờ đủ thời gian hiệu ứng cửa chạy xong
});
