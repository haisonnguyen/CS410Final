
        var home = "http://localhost:8080/"
        jQuery("#top").on("click", (e) => {
            console.log(e.target.id);
            location.href = home + e.target.id;
        });

        jQuery("#hot").on("click", (e) => {
            location.href = home + e.target.id;
        });

        jQuery("#new").on("click", (e) => {
            location.href = home + e.target.id;
        });

        jQuery("#controversial").on("click", (e) => {
            location.href = home + e.target.id;
        });

        jQuery("#rising").on("click", (e) => {
            location.href = home + e.target.id;
        });
