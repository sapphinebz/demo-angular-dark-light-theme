# How to create dark theme and light theme

สร้างตัวแปร css variable ไว้ที่ไฟล์ style.scss แบ่งเป็น class dark-theme และ class light-theme
จากนั้นที่ component ต่างๆที่ต้องการแสดงผลตาม theme เช่น card.component ให้กำหนด style ให้แสดงผลตาม theme ใน card.component.scss โดยใช้ตัวแปรจาก css variable ที่กำหนดใน style.scss

การเปลี่ยน theme สามารถใช้งานโดย ThemeService
