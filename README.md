# System Optimizer API
### Frontend for system optimizer

*Nowadays, one of the biggest challenges related to optimization of systems and services is to know which algorithm we should use in each of the different problems that exist in the business world. Usually, the choice of the best algorithm is a very time-consuming process and involves the experimentation of several methods by many experts in the industry. With this in mind, and with the aim of making this process more agile, we were presented with an innovative idea that consists in providing optimization services in a fully automatic and digital way, based on the knowledge that has already been acquired over the years. The core idea is to use a knowledge base that contains the expertise on which algorithms are best for a given type of problem and after its choice, run it dynamically through a provided framework. The biggest challenge here is to interconnect the various components and make this whole complex process into a product that can be used by customers in a scalable and flexible way, in an area of great innovation that is always changing.*

## Structure of the Application
### Pages
- Home
- Optimizer
- About
- Contacts

The application uses the Angular Material UI component collection to define the visual structure of the application.  
Every component used is an Angular Material component, so to understand the usage of that same components refer to the [Angular Material documentation](https://material.angular.io).

## Optimizer

The optimizer section of the application is divided in multiple tabs to allow the user to indicate all the data regarding his problem:

| Section |  Description  |
| ------------------- | ------------------- |
|  Description |  The user indicates the name and the description of the problem. |
|  Variables | The user indicates the number of objetives to optimize, the type of the decision variables and the decision variables in the problem. If the variables are of type Integer and Double the user also indicates it's minimum and maximum values. |
|  Evaluation |  The user indicates the endpoint to which the backend should make a request to evaluate each solution of the algorithm and the payload struture of that request. |
|  Duration | The user indicates the desired maximum duration of the process. |
|  Confirmation | The user confirms the inserted data and starts the process. |


### Error Handling and Validations

The Optimizer section is implemented using Angular Reactive Forms and each tab is a different form.  
Every input that is marked as required has a Validator in its correspondent form that doesn't allow the user to proceed unless the value is filled.
Here we can see an example of a FormGroup:
```ts
{
  name: ['', Validators.required],
  description: ['', [
      Validators.required,
      Validators.maxLength(200)
    ]
  ]
}
```
The description field has two validations, one that makes it required and other that limits its size to 200 characters.  
  
In the tab Variables, the Variables table is a FormArray, that is, is an array of forms. With that is is possible to verify the correct filling of every variable, such as having the minimum range lower than the maximum range:
```ts
this._formBuilder.group(
      {
        name: [null, [Validators.required, Validators.maxLength(23)]],
        min: [{value: null, disabled: this.isDisabled()}, Validators.required],
        max: [{value: null, disabled: this.isDisabled()}, Validators.required],
        description: [null],
      },
      {
        validators: [this.rangeValidator.minLessThanMax()],
        updateOn: 'blur'
      }
    );
```

In the tab Evaluation, the Endpoint structure is verified by a regex expression, in order to prevent a server-side error.

## Comunication with the Backend
The whole form filled by the user is converted into the payload needed by the backend problem, the payload structure is the following:
```json
{
    "name": "Kursawe",
    "description": "Kursawe Problem",
    "nObjectives": 2,
    "listOfVariables": [{
        "name": "x",
        "min": -5,
        "max": 5,
        "description": null,
        "type": "double"
    }, {
        "name": "y",
        "min": -5,
        "max": 5,
        "description": null,
        "type": "double"
    }, {
        "name": "z",
        "min": -5,
        "max": 5,
        "description": null,
        "type": "double"
    }],
    "endpoint": "http://localhost:8080/client/example/double",
    "payload": "vefwfw",
    "duration": 15
}
```
With this payload, the following request is made:  
`POST` http://localhost:3080/problem  
The backend will calculate the solutions and the objectives of the problem and return them. When the frontend receives the following data:
```json
{
    "id": 566,
    "results": [
        {
            "solution": [{
                "name": "x",
                "value": -1.152846909704582
            }, {
                "name": "y",
                "value": -1.1527026464196768
            }, {
                "name": "z",
                "value": -4.550774748636573
            }],
            "objective": [{
                "value": -7.751524062927993
            }, {
                "value": -7.751524062927993
            }]
        }, 
        {
            "solution": [{
                "name": "x",
                "value": -1.2008194466198472E-5
            }, {
                "name": "y",
                "value": -9.089198827857872E-7
            }, {
                "name": "z",
                "value": -4.453829913172586
            }],
            "objective": [{
                "value": 1.3044949667870845E-4
            }, {
                "value": 1.3044949667870845E-4
            }]
        }
    ]
}
```
Then this data is deserialized into the Model classes created to provide structure to the data. Those classes are:

- Problem
- Result
- Solution
- Objective
- Variable

With this classes we can define a hierarchical structure making it easier to display that data in the solution page.

### Solution Page

To display the solution two tables were created, the first one being the solution table and the second one being the objectives table.  
The columns of the first table are dinamically created using the variables names.  
The results are paginated using the same paginator in order to maintain the consistency between both tables and to make it easier for the user to associate the objectives with the solutions.

### Download Files

In the solutions pages there are two buttons that make it possible for the user to download the solutions and the objectives.  
The two buttons will make a request to the backend and will receive the file stored server-side.  
The request for files is the following:

`POST` http://localhost:3080/file/${id}?type=VAR

or

`POST` http://localhost:3080/file/${id}?type=FUN


## How to pull and run Docker image

### Pull Docker Image
```batch
docker pull diogomfernandes/system-optimizer-ui
```

### Run Container
```batch
docker run --name angular -dit -p 3000:80 diogomfernandes/system-optimizer-ui:latest
```


## Used Frameworks / UI Collections
- Angular
- Angular Material
