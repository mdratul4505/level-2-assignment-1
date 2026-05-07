// problem -1 
function filterEvenNumbers(numbers: number[]): number[] {
  return numbers.filter((num) => num % 2 === 0);
}


// problem -2

function reverseString(str: string): string {
  return str.split("").reverse().join("");
}
 

// problem -3

type StringOrNumber = string | number;
 
function checkType(value: StringOrNumber): string {
  if (typeof value === "string") {
    return "String";
  } else {
    return "Number";
  }
}
 

// problem -4

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}


// problem -5

interface Book {
  title: string;
  author: string;
  publishedYear: number;
}

interface BookWithReadStatus extends Book {
  isRead: boolean;
}

function toggleReadStatus(book: Book): BookWithReadStatus {
  return {
    ...book,
    isRead: true,
  };
}
 


// problem -6
class Person {
  name: string;
  age: number;
 
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
 
class Student extends Person {
  grade: string;
 
  constructor(name: string, age: number, grade: string) {
    super(name, age);
    this.grade = grade;
  }
 
  getDetails(): string {
    return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
  }
}



// problem -7
function getIntersection(arr1: number[], arr2: number[]): number[] {
  return [...new Set(arr1.filter((num) => arr2.includes(num)))];
}

