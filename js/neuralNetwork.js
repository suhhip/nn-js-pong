function NeuralNetwork () {
	this.net       = new convnetjs.Net();
	this.trainer   = new convnetjs.Trainer(this.net, {
		method          : 'sgd',
		momentum        : 0.9,
		l1_decay        : 0,
		l2_decay        : 0.001,
		learning_rate   : 0.0001,
		batch_size      : 1,
	});
	
	this.loadNetwork = function (playerNetwork) {
		this.net.fromJSON(playerNetwork);
		
		return this;
	};
	
	this.downloadNetwork = function () {
		var networkJson     = this.net.toJSON();
		var networkString   = JSON.stringify(networkJson);
			networkString = 'var player = ' + networkString + ';';
		
		downloadStr(networkString, 'player.js');
    };
	
	this.createTrainableNet = function ()
	{
		var layer_defs = [];
		layer_defs.push({ type: 'input', out_sx: 1, out_sy: 1, out_depth: 6 });

		layer_defs.push({ type: 'fc', activation: 'relu', num_neurons: 32 });
		layer_defs.push({ type: 'fc', activation: 'relu', num_neurons: 32 });
		layer_defs.push({ type: 'fc', activation: 'relu', num_neurons: 32 });
		layer_defs.push({ type: 'fc', activation: 'relu', num_neurons: 32 });
		layer_defs.push({ type: 'fc', activation: 'relu', num_neurons: 32 });
		layer_defs.push({ type: 'fc', activation: 'relu', num_neurons: 32 });
		layer_defs.push({ type: 'fc', activation: 'relu', num_neurons: 32 });
		layer_defs.push({ type: 'fc', activation: 'relu', num_neurons: 32 });

		layer_defs.push({ type:'regression', num_neurons: 1 });
		
		this.net.makeLayers(layer_defs);
		
		return this;
	};
	
	this.training = function (trainData, maxIteration, breakOnDiff) {
        var trainSize = trainData.length;
        
        console.info('Train collect size: ' + trainSize);
		console.info('Start');
		console.group('Iteration informations');

			var input, reaction, avgDiff;
            for (var i = 0; i < maxIteration; ++i) {
				console.log('iteration: ' + (i+1));
				
				for (var row in trainData) {
					input = new convnetjs.Vol(trainData[row].input);
					this.trainer.train(input, trainData[row].output);
				}
				
				avgDiff = 0;
				for (var iTKey = 0; iTKey < trainSize; ++iTKey) {
					input = new convnetjs.Vol(trainData[iTKey].input);
					reaction = this.net.forward(input).w;

					for (var keyT in trainData[iTKey].output) {
						avgDiff += Math.abs(reaction[keyT] - trainData[iTKey].output[keyT]);
					}
				}
					
				avgDiff = Math.abs(avgDiff / trainSize).toFixed(4);
				
				console.log('   avgDiff: ' + avgDiff);
				if (avgDiff <= breakOnDiff) {
					break;
				}
				
				trainData = shuffleArray(trainData);
			}

		console.groupEnd();
		console.info('Done');
		
		return this;
	};
	
	this.collectTrainData = function (Log) {
        var trainData = [];
        for (var row in Log) {
            var inCriticalPlace = ((Log[row][0] <= 15 && Log[row][0] >= 3) && Log[row][2] < 0);
            
            if (!Log[row][5] && !Log[row][6] && !inCriticalPlace) {
	            continue;
            }
            
            trainData.push({
	            input: [
					Log[row][0], // ball posX
					Log[row][1], // ball posY
					(Log[row][2] > 0 ? 1 : (Log[row][2] < 0 ? -1 : 0)), // ball moveX
					Log[row][3], // ball moveY
					Log[row][4], // player posY,
					1, // bias
				],
				output: [
		           (Log[row][5] ? 1 : (Log[row][6] ? -1 : 0)),
	            ],
            });
        }
        
        return trainData;
	};
}
