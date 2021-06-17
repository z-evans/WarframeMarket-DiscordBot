class MathManager {
  getMode = (list: number[]) => {

    let mostUsed: number[] = [];
    const parsedNumbers: Grouped[] = [];

    let current = 0;
    let cnt = 0;
    list.forEach(num => { // Foreach value
      if (num != current) { // If number is new
        if (cnt > 0) { // If count is greater than 0
          parsedNumbers.push({ // Add old number to list
            number: current,
            count: cnt
          });
        }
        current = num; // Reset values for new number
        cnt = 1;
      } else {
        cnt++; // Add to count if nothing changes
      }
    });
    parsedNumbers.push({ // Add last number to list
      number: current,
      count: cnt
    });

    let highest = 0;
    parsedNumbers.forEach(e => { // For eached processed value
      if (e.count >= highest) { // If the count is greater or equal than the stored highest
        if (e.count > highest) { // If the value is greater than then reset mostUsed list with new value
          mostUsed = [e.number];
        } else if (e.count == highest) { // If the value is the same then add to the list
          mostUsed.push(e.number);
        }
        highest = e.count; // Set the highest recorded
      }
    });

    return mostUsed; // Return most used values
  }
}

export default new MathManager();

interface Grouped { // Making formatted object. Makes it easier to read
  number: number,
  count: number
}