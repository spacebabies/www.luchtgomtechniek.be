window.addEventListener('DOMContentLoaded', function () {
    var galleries = document.querySelectorAll('.gallery-viewerjs');

    if (galleries) {
        for (var i = 0; i < galleries.length; i++) {
            var list = galleries[i].querySelector('ul');

            if (list) {
                var gallery = new Viewer(list, {
                    button: false,
                    navbar: false,
                    toolbar: false,
                    url: "data-original"
                });
                gallery.show();
            }
        }
    }
});