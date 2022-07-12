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
  var options = {
    buffer: 10,
    itemBuilder: builder,
    itemHeight: 48,
    container: list,
    data,
    insetTop: '8px',
    insetBottom: '8px',
    startIndex: 50,
    scrollAlignment: 'center'
  };
  var virtualScroller = new VirtualScroller(options);
})(window.Forge.lib);
