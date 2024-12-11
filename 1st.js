document.addEventListener('DOMContentLoaded', () => {
    // 原有后端按钮交互逻辑
    const buttons = document.querySelectorAll('.buttons-area button');
    const teacherContent = document.querySelector('.teacher-content');

    buttons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const param = "button" + (index + 1);
            fetch('/api/buttonAction?button=' + param)
                .then(response => response.json())
                .then(data => {
                    console.log("Received from server:", data);
                    const infoP = document.createElement('p');
                    infoP.textContent = "后端返回的信息：" + data.message;
                    teacherContent.appendChild(infoP);
                })
                .catch(err => {
                    console.error("Error from server:", err);
                });
        });
    });

    // 摄像头开启逻辑
    const openCamBtn = document.getElementById('openCamBtn');
    const studentVideo = document.getElementById('studentVideo');

    openCamBtn.addEventListener('click', () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(stream => {
                studentVideo.srcObject = stream;
                studentVideo.play();
            })
            .catch(err => {
                console.error("Error accessing camera:", err);
                alert("无法访问摄像头，请检查你的浏览器设置和权限。");
            });
    });
});
