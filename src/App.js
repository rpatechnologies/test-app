import "./App.css";
import { useEffect } from "react";
function App() {
  const rooms = [
    { room_type: "Queen", vacant_rooms: 5, price: 100 },
    { room_type: "Double", vacant_rooms: 3, price: 75 },
    { room_type: "Twin", vacant_rooms: 8, price: 60 },
  ];
  const formatPrice = (price) => {
    return "$" + price;
  };

  //basic case is coverd the number which is divisible
  //by 14 can also be divisible by 2 and 7, those cases are not covered due
  //to lake of clarification about the functionlity required
  const checkNum = (num) => {
    if (num % 14 == 0) {
      console.log("foobar");
    } else if (num % 7 == 0) {
      console.log("bar");
    } else if (num % 2 == 0) {
      console.log("foo");
    } else {
      console.log(num);
    }
  };

  useEffect(() => {
    checkNum(14);
  }, []);
  return (
    <div className="App">
      <ol>
        {rooms.map((item, index) => {
          return (
            <li>
              {item.room_type},{item.vacant_rooms}, {formatPrice(item.price)}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default App;
