# OlympicGamesStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.6.

Don't forget to install your node_modules before starting (`npm install`).

## Architecture

See [architecture.md](./architecture/architecture.md)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Where to start

As you can see, an architecture has already been defined for the project. It is just a suggestion, you can choose to use your own. The predefined architecture includes (in addition to the default angular architecture) the following:

- `pages` folder: contains components used for routing
- `components` folder: contains every reusable components ( used in pages )
- `models` folder: contains the models defined in the application
- `services` folder: contains the specific services

## Component details

### Page Header

Displays the header of the application

### Chart Component

A convenient way to display a chart.
Uses the chart service to create a chart.

To use it provide these values

```ts
@Input() chartId!: string;    // html selector to locate the chart
@Input() type!: AppChartType; // line | pie 
@Input() labels!: string[];
@Input() data!: number[];
@Input() targetPage?: string; // for a pie chart, sends the user on "targetPage/[clickedLabel]" if chart is clicked
```

### Information Component

Provides a reusable HTML component reused troughout the application to display informations

## Services Details

### Chart Service

Provides an interface between the app and the chart module.
2 chart types are managed so far.

### Data Service

Provides a centralized way to access data.

## How to

### Add a new page

Follow these steps :

1. create a route in app-routing.module.ts
1. create the component in the page folder
1. use components to create your page
1. use / create services if necessary