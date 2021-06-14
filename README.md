# Scheduling Optimizer API
### Frontend for Scheduling Optimizer


## Structure of the Application
### Pages

The application uses the Angular Material UI component collection to define the visual structure of the application.  
Every component used is an Angular Material component, so to understand the usage of that same components refer to the [Angular Material documentation](https://material.angular.io).

## Optimizer

The optimizer section of the application is divided in multiple tabs to allow the user to indicate all the data regarding his problem:

| Section |  Description  |
| ------------------- | ------------------- |
|  Order | The user indicates the name, the description of the order and the jobs that will be processed within that order. |
|  Resources | The user indicates the resources that are available to process the order and to fulfill all the jobs. In each type of resource the user indicates the quantity available and the cost of each one. |
|  Operations | The user indicates the sequence of operations that each job requires. The order of the operations and the required time for each one matters and will be ensured by the algorithm and the solution presented. |
|  Optimization | The user indicates which objectives are important for the solution and those objectives will be presented associated with each solution. |
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
  ],
  jobs: this._formBuilder.array([])
}
```
The description field has two validations, one that makes it required and other that limits its size to 200 characters.

In the tab Resources, the Resources table is a FormArray, that is, is an array of forms. With that is is possible to verify the correct filling of every variable:
```ts
this._formBuilder.group(
  {
    id: [currentId],
    name: [null, [Validators.required, Validators.maxLength(23)]],
    quantity: [null, [Validators.required]],
    cost: [null, [Validators.required]],
    description: [null],
  },
  {
    updateOn: 'blur',
  }
);
```
The same stategy applies to the jobs portion of the Order screen, as well as the operations screen which both require to have at least one element (one job and one operation per job) to proceed with the process.

## Comunication with the Backend
The whole form filled by the user is converted into the payload needed by the backend problem, the payload structure is the following:
```json
{
  "order":{
    "name":"Order 1",
    "description":"Order 1",
    "jobs":[
      {
        "name":"Job 0",
        "operations":[
          {
            "resourceId":0,
            "estimatedTime":5,
            "index":0
          },
          {
            "resourceId":1,
            "estimatedTime":10,
            "index":1
          }
        ],
        "description":"This is the job 0"
      },
      {
        "name":"Job 1",
        "operations":[
          {
            "resourceId":1,
            "estimatedTime":20,
            "index":0
          },
          {
            "resourceId":0,
            "estimatedTime":5,
            "index":1
          },
          {
            "resourceId":0,
            "estimatedTime":2,
            "index":2
          }
        ],
        "description":"This is the job 1"
      }
    ],
    "duration":4,
    "objectives":{
      "totalTime":true
    }
  },
  "resource":{
    "type":"Machines",
    "resources":[
      {
        "id":0,
        "name":"Machine A",
        "quantity":3,
        "cost":20000,
        "description":"This is the Machine A"
      },
      {
        "id":1,
        "name":"Machine B",
        "quantity":4,
        "cost":10000,
        "description":"This is the Machine B"
      }
    ]
  }
}
```
With this payload, the following request is made:  
`POST` http://localhost:3080/sheduling  
The backend will calculate the solutions and the objectives of the problem and return them. When the frontend receives the following data:
```json
{
  "solutions":[
    {
      "objectives":[
        {
          "name":"makespan",
          "value":11
        }
      ],
      "stations":[
        {
          "machines":[
            {
              "name":"Machine A",
              "operations":[
                {
                  "id":3,
                  "job":"Job 1",
                  "startTime":0,
                  "endTime":2
                },
                {
                  "id":0,
                  "job":"Job 0",
                  "startTime":2,
                  "endTime":5
                }
              ]
            }
          ]
        },
        {
          "machines":[
            {
              "name":"Machine B",
              "operations":[
                {
                  "id":6,
                  "job":"Job 2",
                  "startTime":0,
                  "endTime":4
                },
                {
                  "id":1,
                  "job":"Job 0",
                  "startTime":5,
                  "endTime":7
                },
                {
                  "id":5,
                  "job":"Job 1",
                  "startTime":7,
                  "endTime":11
                }
              ]
            }
          ]
        },
        {
          "machines":[
            {
              "name":"Machine C",
              "operations":[
                {
                  "id":4,
                  "job":"Job 1",
                  "startTime":2,
                  "endTime":3
                },
                {
                  "id":7,
                  "job":"Job 2",
                  "startTime":4,
                  "endTime":7
                },
                {
                  "id":2,
                  "job":"Job 0",
                  "startTime":7,
                  "endTime":9
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```
Then this data is deserialized into the Model classes created to provide structure to the data. Those classes are:

- Order
- Solution
- Objective
- Station
- Machine
- Operation

With this classes we can define a hierarchical structure making it easier to display that data in the solution page.

### Solution Page

All the solutions are displayed inline, with each of them having a timeline graph and a list of all the objectives the user required and the values obtain for said solution.  
The timeline graph will display in each line the sequence of operations to be done in each machine type.  
If there are several machines of the same machine type multiple lanes for the same line with be displayed. In that case, the jobs being performed in parallel will be on top of one another.
The horizontal axis of the graph naturally represents time with the maximum value being the end of the whole order for that solution.

## How to pull and run Docker image

### Pull UI Docker Image
```batch
docker pull diogomfernandes/scheduling-optimizer-ui
```

### Run UI Container
```batch
docker run --name angular -dit -p 3000:80 diogomfernandes/scheduling-optimizer-ui:latest
```

### Pull Both Images
```batch
docker-compose pull
```

### Run Both Containers
```batch
docker-compose up -d
```


## Used Frameworks / UI Collections
- Angular
- Angular Material
