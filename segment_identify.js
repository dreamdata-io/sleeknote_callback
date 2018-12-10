function getEmail() {
    var v = document.cookie.match("(^|;) ?SNC=([^;]*)(;|$)");
    var cookie = v ? v[2] : null;
    var data = JSON.parse(cookie);
    var email = null;

    if (data && data.cs) {
        Object.keys(data.cs).forEach(x => {
            var campaign = data.cs[x];
            if (campaign && campaign.b) {
                email = String(campaign.b[1]).toLowerCase();
                return;
            }
         });
    }

    return email;
};

function sleeknote_identify() {
    if (analytics) {
        var user = analytics.user();
        if (!user || !user.id()) {
            var email = getEmail();
            if (email) {
                analytics.identify(email, { email: email });
                analytics.track("sleeknote_identify");
            }
        }
    }
};

analytics.ready(function() {
    sleeknote_identify();
});