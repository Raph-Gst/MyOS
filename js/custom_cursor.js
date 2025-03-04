export function MoveCursor() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (window.location.href.includes("endoflight") || isMobile) {
        return;
    }
    const cursorCheck = document.querySelector('.custom_cursor');
    if(cursorCheck){
        console.log("cursor existe deja .... ")
        return;
    }
    else{
    const cursor = document.createElement("div");
    cursor.classList.add("custom_cursor");
    document.body.appendChild(cursor);

    const viewName = document.createElement("div");
    viewName.classList.add("view_name_container");
    viewName.style.display = "none";
    cursor.appendChild(viewName);
    const name = document.createElement("div");
    name.classList.add("view_name");
    viewName.appendChild(name);

    document.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        viewName.style.left -= cursor.style.left;
        viewName.style.top -= cursor.style.top ;
    });
    }
}
