$(document).ready(function(){
	findAll2();
	$('#delete2').hide()
});
var userURL = "http://localhost:8080/TechWorld/rest/users";
var currentUser;

$(document).on("click", "#userTable a",function(){
	event.preventDefault();
	$('#userModal').modal('show');
	findById2(this.id);
});

var findAll2 = function() {
	console.log('findAll2');
	$.ajax({
		type: 'GET',
		url: userURL,
		dayaType:"json",
		success: renderList2
	});
};

$(document).on("click", '#btnAdd2', function(){
	newUser();
});
$(document).on("click", '#create2', function(){
	if($('#id').val()=='')
		addItem();
	else
		updateUser();
	return false;
});
$(document).on("click", '#delete2', function(){
	deleteUser();
});

var findById2= function(id){
	console.log('findById '+id);
	$.ajax({
		type: 'GET',
		url: userURL + '/'+id,
		dataType: "json",
		success: function(data){
			$('#btnDelete').show();
			console.log('findById success: '+data.name);
			currentUser = data;
			$('#delete').show();
			renderDetails2(currentUser);
		}
	});
}

var renderDetails2=function(item){
	$('#id').val(user.id);
	$('#name').val(user.name);
	$('#email').val(user.email);
	$('#pass').val(user.pass);
	$('address').val(user.address);
	$('dob').val(user.dob);
	$('role').val(user.role);
}

var formToJSON2=function(){
	return JSON.stringify({
		"name": $('#name').val(),
		"email":$('#email').val(),
		"pass":$('pass').val(),
		"address": $('#address').val(),
		"dob": $('#dob').val(),
		"role": $('#role').val()
	});
};

function renderList2(data){
	list=data;
	$.each(list, function(index, user){
		$('#userTable').append('<tr><td>'+user.name+'</td><td>'+user.email+
		'</td><td>'+user.address+'</td><td>'+user.dob+'</td><td><a id="'+user.id+'" href="edit">Edit</td></tr>');
	});
	$('#table_id2').DataTable();
};