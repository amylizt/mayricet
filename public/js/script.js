window.onload = () => {
    const container = document.getElementById('logo-container');
    const dotCom = document.getElementById('dot-com');

    const name1 = "MAY RICET";
    const name2 = "AMY TRICE";
    const mapping = [1, 0, 2, 3, 5, 6, 7, 8, 4]; 
    
    let isName1 = true;

    const spans = name1.split('').map((char) => {
        const span = document.createElement('span');
        span.innerText = char;
        span.className = 'letter';
        container.appendChild(span);
        return span;
    });

    function getPositions(text) {
        const ghost = document.createElement('div');
        ghost.style.visibility = 'hidden';
        ghost.style.position = 'absolute';
        ghost.style.display = 'inline-block';
        ghost.style.whiteSpace = 'pre';
        ghost.style.fontSize = '2.5rem';
        ghost.style.fontWeight = 'bold';
        ghost.style.textTransform = 'uppercase';
        
        const ghostSpans = text.split('').map(char => {
            const s = document.createElement('span');
            s.innerText = char;
            ghost.appendChild(s);
            return s;
        });
        
        document.body.appendChild(ghost);
        const rects = ghostSpans.map(s => s.offsetLeft);
        const totalWidth = ghost.offsetWidth;
        document.body.removeChild(ghost);
        
        return { rects, totalWidth };
    }

    const pos1 = getPositions(name1);
    const pos2 = getPositions(name2);

    function animate() {
        const currentPos = isName1 ? pos1 : pos2;
        const centerOffset = currentPos.totalWidth / 2;
        const bgArt = document.getElementById('bg-art');
        spans.forEach((span, i) => {
            const targetIndex = isName1 ? i : mapping[i];
            const leftPos = currentPos.rects[targetIndex];
            span.style.left = `calc(50% + ${leftPos - centerOffset}px)`;
            if (name1[i] === ' ') {
                span.style.opacity = "0";
            } else {
                span.style.opacity = "1";
                span.style.color = isName1 ? '#00d4ff' : '#9d50bb';
                span.style.textShadow = isName1 ? 
                    '0 0 15px rgba(0, 212, 255, 0.6)' : 
                    '0 0 15px rgba(157, 80, 187, 0.6)';
            }
        });
        dotCom.style.opacity = isName1 ? "1" : "0";
        dotCom.style.transform = `translateX(${isName1 ? (pos1.totalWidth / 2) + 10 : (pos2.totalWidth / 2)}px)`;
	if (isName1) {
		bgArt.classList.remove('alt-state');
	} else {
		bgArt.classList.add('alt-state');
	}
    }

    animate();

    setInterval(() => {
        isName1 = !isName1;
        animate();
    }, 4000);
};
