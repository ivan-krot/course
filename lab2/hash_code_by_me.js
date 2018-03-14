var fs = require('fs');//include fs library
var file_name = 'a_example.in';
//var file_name = 'b_should_be_easy.in';
fs.readFile(file_name, function (err, contents) {
    var lines = contents.toString().split('\n');
    var input_data = lines[0];

    var input_data = input_data.toString().split(' ');

    /* assigning values to variables*/
    var c_grid_col = input_data[0];
    var r_grid_row = input_data[1];
    var f_cars = input_data[2];
    var n_rides = input_data[3];
    var b_bonus = input_data[4];
    var t_steps = input_data[5];

    /*answer for write*/
    var answer_txt = '';

    /*Output all values*/
    // console.log('Grid col: '+c_grid_col);
    // console.log('Grid row: '+r_grid_row);
    // console.log('Avaliable cars: '+f_cars);
    // console.log('Total rides: '+n_rides);
    // console.log('Bonus per success ride: '+b_bonus);
    // console.log('Total steps: '+t_steps);

    /*i=0 - input data*/
    var arr_rides = [];
    /*[i][0]-s,*/
    var arr_rides_info = [];
    for (var i = 1; i < lines.length - 1; i++) {
        var curr_ride = lines[i].toString().split(' ');
        arr_rides.push(curr_ride);
        var ride_s = Math.abs(curr_ride[2] - curr_ride[0]) + Math.abs(curr_ride[3] - curr_ride[1]);
        arr_rides_info.push(ride_s);
    }

    function calc_ride_length(ride) {
        var total_ride = Math.abs(ride[2] - ride[0]) + Math.abs(ride[3] - ride[1]);
        return total_ride;
    }

    function calc_length_to_start(curr_pos, ride) {
        var total_start = Math.abs((curr_pos[0] - ride[0]) + (curr_pos[1] - ride[1]));
        return total_start;
    }

    /*autopark*/
    /*coords*/
    var autopark = [];
    for (var i = 0; i < f_cars; i++) {
        autopark.push([0, 0, 'free']);
    }

    /*avaliable cars*/
    function select_avaliable_cars(all_cars) {
        var arr = [];
        for (var i = 0; i < all_cars.length; i++) {
            if (all_cars[i][2] === 'free') {
                arr.push(all_cars[i]);
            }
        }
        return arr;
    }

    /*DO*/
    /*INCLUDE HERE LOGIC FOR IGNORING NO-FREE CARS AT THE MOMENT - t */
    var autopark = select_avaliable_cars(autopark);

    /*monitoring assigned routes, if all routs will be asiigned cycle will be breaked*/
    var total_assigned = 0;

    /*array_assigning*/
    var array_of_assigned_routes = [];

    for (var t = 0; t < t_steps; t++) {

        for (var c = 0; c < autopark.length && total_assigned < arr_rides.length /*lyapuha*/; c++) {
            var dist = undefined;
            var car = undefined;
            var ride = undefined;

            for (var r = 0; r < arr_rides.length /*&& total_assigned < autopark.length*/; r++) {
                if (arr_rides[r] === 'assigned' ) {
                    continue;
                }
                var c_dist = calc_length_to_start(autopark[c], arr_rides[r]);
                if (dist === undefined || c_dist < dist) {
                    dist = c_dist;
                    car = c;
                    ride = r;
                }
            }

            /*remove assigned ride from array*/
            if (ride !== undefined) {
                arr_rides.splice(ride, 1, 'assigned');
                total_assigned++;

                array_of_assigned_routes[c] = array_of_assigned_routes[c] ? array_of_assigned_routes[c] : [];
                array_of_assigned_routes[c].push(ride);
                // routes += ride + ' ';
                // //console.log('For car '+car+' most closer ride '+ride+'. Distance:'+dist);
                // assigned_txt += counter + ' ' + routes + '\n';
                console.log('Array output: '+array_of_assigned_routes[0]);
            }
        }
    }

    /*prepear to output result*/
    var assigned_txt = '';
    for(var j=0;j<array_of_assigned_routes.length;j++){
        assigned_txt += array_of_assigned_routes[j].length;
        for(var k=0;k<array_of_assigned_routes[j].length;k++){
            assigned_txt += ' '+array_of_assigned_routes[j][k];
        }
        assigned_txt += '\n';
    }

    /*writing*/
    var answer = 'return.txt';

    fs.open(answer, "w+", 0644, function (err, file_handle) {
        if (!err) {
            fs.write(file_handle, assigned_txt, null, 'ascii', function (err, file_handle) {
                if (!err) {
                    //console.log('Anwer was successfull wrote in the '+answer+' file.');
                } else {
                    console.log('Acces denied : ' + answer);
                }
            });
        } else {
            console.log('Error to open file: ' + answer);
        }

    })

});