
## Internal [IoT](https://in.nau.edu/its/iot-nau/){:target="\_blank"} Projects
Since November of 2021, I have been working for the IoT team on our NAU campus. The team        <wbr/>
is responsible for a number of projects with the overarching goal to make our campus smart with <wbr/>
integration of various micro devices and services across campus. I have had the privledge to    <wbr/> 
works on a number of in house developments as well as collaboritive efforts with Electrical     <wbr/>
Engineering and Computer Science research projects.                                             <wbr/>

<hr style="border:0.5px solid grey">
### NAU Live Dashboard  

Goal of this project is to use the BACnet communication protocol to display the               <wbr/>
live energy consumption of each building located on the NAU Mountain Campus and display         <wbr/>
those values to a website.  <wbr/>

### Climate Indicator Project

Under the lead Electrical Engineer, I was assigned a project with the goal of creating          <wbr/>
a weather station. I decided from scratch utilizing breadboards, microcontrollers, sensor       <wbr/>
shields, many resistors and wires, was the best way. After learning basic Physics of EE         <wbr/>
(voltage, resistance, current, etc) I was ready to get started.                                 <wbr/>

Idea is to use the ATMEGA2560 as a host microcontroller and utilize an ESP module (D1 Mini Pro, <wbr/>
or bare ESP82066 module) to give the MCU internet connectivity for publishing values. The values<wbr/> 
will be published via MQTT and fed into an instance of InfluxDB hosted on a RPI 4. The data can <wbr/>
be visualized in a number of way (will likely go with grafana.) The mass amounts of readings    <wbr/>
sent into the DB are subject to statistical analysis in this case the implementation of the     <wbr/>
Python lib Pandas will be used which will also be used in the visual implementation stage...    <wbr/>
Final result will contain necessary peripherals on a Printed Circuit Board (PCB).               <wbr/>
* [Source](https://github.com/akielaries/CIP_pub){:target="\_blank"}

___
## DiscoverCCRI [(Distributed Sensing & Computing Over Sparse Environments)](https://discoverccri.org/){:target="\_blank"}
<hr style="border:1px solid grey">
A collaboration project including Northern Arizona University's School of Informatics,          <wbr/> 
Computing, and Cyber Systems, Clemson University's Holcombe Department of Electrical and        <wbr/>
Computer Engineering and Navajo Technical University, Distributed Sensing and Computing Over    <wbr/>
Sparse Environments (DISCOVER), is building a network of field sites to allow researchers to    <wbr/>
study distributed computing and networking in rural and remote areas to empower detection and   <wbr/> 
response to environmental and civil disasters. The DISCOVER cyberinfrastructure will allow      <wbr/>
computer scientists and engineers to study how IoT devices and networks can be designed to      <wbr/>    
work in technically challenging rural or remote areas.                                          <wbr/>
This research project had tasked the IoT team with building some fundamental tools to allow     <wbr/>
researchers on this projects to get started.                                                    <wbr/>

### Weather Station 

Using the Seeed SenseCAP ONE S900 Compact Weather Station, the goal is to collect the nine 
paramaters it reads in and publish them over MQTT. The weather station node is hosted by a 
Rasperberry Pi 4 and will then be put on our NAU mountain campus to publish values for others 
to see.

### Robotics RoverAPI using ROS (Robot Operating System)

Rover project using ROS and Python.
More details soon...

___



