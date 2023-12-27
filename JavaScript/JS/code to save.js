// Run function on keyboard event
<div tabIndex="0" onKeyDown={(e) => { e.key === 'Enter' && doSomething() }}></div>



// Copy text and animate it on click
const copyText = (e) => {
        try {
            const frames = [
                { textShadow: '0px 0px black' },
                { textShadow: '0px -10px rgba(255, 255, 255, 0)' }
            ];

            const options = {
                duration: 300,
                iterations: 1,
            };

            navigator.clipboard.writeText(e.target.innerText).then(() => {
                e.target.animate(frames, options);
            });
        } catch (err) {
            console.error(err);
    }
}
