# QAE Hierarchy

The Qlik Engine API for version 12.556.0 has 298 API methods. The 298 methods are split across Classes (9 to be exact), but all of them effectively serve the same job: take a request from a client and pass it to the engine. Then return a response from the engine.

There are, however, 25 API methods that are different than the rest. They serve a special purpose in that when they are called, they create or find an object on the Qlik engine, and returning a reference (handle) of that object.

This concept is what often leads to confusion when new developers learn the Qlik Engine API. In a class, it isn't always clear what methods are creating handles to other classes, and what methods are just executing an action and returning a response in the form of data. The intention of this documentation is to clarify the hierarchy of API Classes, and how to navigate the tree.

## Classes and their Handle Creators
