pragma solidity ^0.5;

contract TodoList {
    uint public count = 0;

    struct Task {
        uint id;
        string title;
        string text;
        bool completed;
    }

    mapping(uint => Task) public tasks;

    constructor() public {
        createTask("Hackera", "hello there");
    }

    function createTask(string memory title, string memory text) public payable {
        count++;
        tasks[count] = Task(count, title, text, false);
    }
}
