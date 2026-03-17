(function() {
    const blockedCat = "66f5d9266653802c82c96cd5";

    window.loadOffers = function() {
        if (!window.offerApiUrl || window.loaded === true) return;
        
        fetch(window.offerApiUrl)
            .then(res => res.json())
            .then(data => {
                window.loaded = true; // منع التكرار
                let html = '';
                let filtered = data.filter(o => String(o.category_id) !== blockedCat);
                
                filtered.slice(0, 3).forEach(o => {
                    let u = o.url + "&sub1=zero";
                    html += `
                    <div class="offer-card" onclick="window.openO('${u}', this)">
                        <div class="offer-link">
                            <div class="icon-section"><img src="${o.network_icon}" class="offer-icon"></div>
                            <div class="offer-info"><div class="offer-anchor">${o.anchor || "Click to Start"}</div></div>
                        </div>
                    </div>`;
                });
                document.getElementById("offerContainer").innerHTML = html;
            });
    };

    window.openO = function(u, e) {
        window.open(u, '_blank');
        e.querySelector('.offer-info').innerHTML = `<div style="display:flex;align-items:center;gap:10px;color:#ffcc00;"><span style="font-size:12px;">Waiting...</span><div class="spinner-mini"></div></div>`;
    };

    setInterval(() => {
        fetch("https://d1y3y09sav47f5.cloudfront.net/public/external/check2.php?testing=0")
            .then(res => res.json()).then(l => { if (l && l.length > 0) window.location.href = "YOUR_SUCCESS_URL"; });
    }, 5000);
})();
