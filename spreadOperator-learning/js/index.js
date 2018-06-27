class SpreadOperator {
	constructor(){
		// 1.不使用Apply函数的调用	
		this.notUseApply();
		// 2.合并数组写法
		this.mergeArray();
		// 3.拷贝数组
		this.copyArray();
		// 4.将arguments或者NodeList转换为Array,当然使用Array.from也可以
		this.nodeToArray();
		// 5.使用Math
		this.useMath();
		// 6.解构赋值
		this.destructuringAssignment();
	}
	// 1.不使用Apply函数的调用
	notUseApply(){
		let args = [1,2,3];
		function doSuff(x,y,z) {
			
		}
		//使用Apply的写法
		doSuff.apply(null,args);
		//不使用Apply的写法
		doSuff(...args);
	}
	// 2.合并数组写法
	mergeArray(){
		let arr1 = ['two','three'];
		let arr2 = ['one','four','five'];
		let arr3 = ['1',...arr1,'3',...arr2,'4'];//将数组插入特定的位置

		arr1.push(...arr2) //将数组2移入数组1尾部
		arr1.unshift(...arr2) //将数组2移入数组1头部
	}
	// 3.拷贝数组
	copyArray(){
		let arr = [1,2,3];
		let arr2 = [...arr];
		arr.push(4)
		//数组中的对象依然是引用值，所以不是任何东西都“拷贝”过去了。
		let orr = [{ a:1 },{ b:2}];
		let orr2 = [...orr];
		orr[0].a = 4
	}
	// 4.将arguments转换为Array,当然使用Array.from也可以
	nodeToArray(){
		let myFn = function (...params) {
			// body...
		}
	}
	// 5.使用Math
	useMath(){
		let numbers = [9,4,3,5,1,6];
		Math.min(...numbers);
	}
	// 6.解构赋值
	destructuringAssignment(){
		let {a,b,...c} = { a: 1, b:2,c:3,d:4,e:5}
		console.log(a)
		console.log(b)
		console.log(c)
	}

}