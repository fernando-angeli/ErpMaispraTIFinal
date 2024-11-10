import { createSwapy } from 'swapy'

function ExecuteSwapy() {
    const container = document.querySelector('#containerSwapy')

    const swapy = createSwapy(container)
    
    // You can disable and enable it anytime you want
    swapy.enable(true)
    
    swapy.onSwap((event) => {
        // console.log(event.data.object);
        console.log(event.data.array);
        // console.log(event.data.map);
      
        // event.data.object:
        // {
        //   'foo': 'a',
        //   'bar': 'b',
        //   'baz': 'c'
        // }
      
        // event.data.array:
        // [
        //   { slot: 'foo', item: 'a' },
        //   { slot: 'bar', item: 'b' },
        //   { slot: 'baz', item: 'c' }
        // ]
      
        // event.data.map:
        // Map(3) {
        // 'foo' => 'a',
        // 'bar' => 'b',
        // 'baz' => 'c'
        // }
      })
}
export default ExecuteSwapy