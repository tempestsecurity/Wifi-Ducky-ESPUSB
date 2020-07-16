# SAP UI5 TextArea control with suggestion/autocomplete feature

## Introduction

Enables SAP UI5 [TextArea](https://sapui5.hana.ondemand.com/#/api/sap.m.TextArea) control to support Autocomplete/Suggestion feature

![Demo](/assets/Demo-TextArea.gif "SAP UI5 TextArea with Autocomplete")

## Sample code

## Dependencies

- [jquery-textcomplete](https://github.com/yuku/jquery-textcomplete) plugin

> **_Note_**: Download jquery-textcomplete plugin from this git repo, as it contains some changes(explained below) to support [sap.ui.define](https://sapui5.hana.ondemand.com/#/api/sap.ui/overview) AMD syntax
>
> **_Changes done to jquery-textcomplete plugin file_**:
>
> - Commented lines 2-12
> - Added new line 13
>
> ![Plugin changes](/assets/Pic_02.PNG "jquery.textplugin.js file changes")

## Usage

- Download jquery-textcomplete javascript file from folder _libs/jquery.textcomplete.js_. Call this file from _manifest.json_
- Provide **_id_** for SAP UI5 TextArea XML tag (in this sample _id_ is _'textArea_01'_)
  ![XML View](/assets/Pic_01.PNG "App.view.xml")
- Call the plugin function on _Textarea_ html element only after rendering of the element is done

## How it works

_jquery-textcomplete_ Plugin contains below methods and will be executed in sequence

- **match**: Supports regular expression or function. When user types anything in the UI5 TextArea element it is continuously checked against the regular expression and triggers search when a match is found
- **search**: This takes two input parameters explained below
  - _query_: Regular expression match found in the method _match_ (previous method) of plugin
  - _fnCallback_: Callback method provided by plugin. This method needs to be called after data retrieval is done. _eg_: Get data from backend/model/ajax call etc, then filter data using _query_ and finally call the callback method
- **template**: Template to display results. [HTML list](https://www.w3schools.com/html/html_lists.asp) is displayed to the user. Each record from the method _search_ is passed as input to this method and return the template to be displayed
- **replace**: If user selects an entry from the displayed suggestion list, then while placing the text in _UI5 TextArea_ element the result can be modified. _eg_: In this current sample code countries are shown, when user selects a country from the list it is converted to uppercase and placed in the _UI5 TextArea_ element
