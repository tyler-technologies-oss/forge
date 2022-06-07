(function ({VirtualScroller}) {
  var list = document.querySelector('#list');
  var data = Array(10000).fill(undefined).map((_, i) => {
    return i.toString();
  });
  var builder = (d, i) => {
    const listItem = document.createElement('forge-list-item');
    listItem.style.width = '100%';
    listItem.innerText = d;
    return listItem;
  };
  var virtualScroller = new VirtualScroller(list, data, builder, 48, {insetTop: '8px', insetBottom: '8px'});

  list.addEventListener('scroll', () => {
    console.log(virtualScroller.actualChildCount);
  });
})(window.Forge.lib);
