window.onload = setTimeout(function(){
    alert(document.referrer);
    const node2 = document.body.childNodes[3];
    const node3 = document.body.childNodes[5];
    document.body.insertBefore(node3, node2);
    node3.addEventListener('mouseover', function() {
	node3.style.transform = "scale(2)";
        node3.style.border = "1px green solid";
});
    node3.addEventListener('mouseout', function() {
	node3.style.transform = "scale(1)";
        node3.style.border = "none";
});
   let result = "";
   if(navigator.onLine){
	result = "Клиент подключён к интернету!";
} else {
        result = "Клиент не подключён к интернету!"
}
	const information = window.open("", "Информация", "width=300, height=250");
	function check() {
    		if(information.document) { // if loaded
        		information.document.title = "Информация";
    		} else {
       			 setTimeout(check, 10); // check in another 10ms
   		}
	}
	check();
}, 5000);