caches.keys().then(function(names) {
    for (let name of names)
        caches.delete(name);
});