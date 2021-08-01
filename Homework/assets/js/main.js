let labelforfile=document.querySelector('.labelforfile')
let inputfile=document.querySelector('#fileinput')
let files=document.querySelector('.files')
let createZone=document.querySelector('.customfilesrow')

labelforfile.addEventListener('dragover',e=>{
    e.preventDefault();
})

labelforfile.addEventListener('drop',e=>{
    e.preventDefault();
    if(e.dataTransfer.files.length){
        let arrayFiles=Array.from(e.dataTransfer.files)
        
        arrayFiles.forEach(file=>{
            createDisplayELement(createZone ,file)
        })
        
    }
})

labelforfile.addEventListener('click',()=>{
    inputfile.addEventListener('change',()=>{
       if(inputfile.files.length){
        let insertedfile=inputfile.files[0]
        createDisplayELement(createZone ,insertedfile)
        inputfile.value=''
       }
    })
})
let id=0
function createDisplayELement(createZone, file){
    const zoneWrapper = document.createElement('span');
    zoneWrapper.className='zoneWrapper'
    zoneWrapper.draggable=true
    zoneWrapper.id=id
    let displayzone=document.createElement('div');
    displayzone.classList.add('customcol3','m-2')
    zoneWrapper.append(displayzone)
    createZone.append(zoneWrapper)

    if (file.type.startsWith("image/")) {
        let reader=new FileReader()
        reader.readAsDataURL(file);
        reader.onload=()=>{
            displayzone.style.backgroundImage=`url('${reader.result}')`
        }
    }

    deletButtonMaker(zoneWrapper)
    deletefired()
    dragimages(zoneWrapper,file)
    draganddelete()
    id++
}

function deletButtonMaker(zoneWrapper) {
    const buttonItem = document.createElement('button');
    buttonItem.classList.add('delete','m-2');
    buttonItem.innerText='delete';
    zoneWrapper.appendChild(buttonItem);
}

function deletefired(){
    let bedelettedImages=document.querySelectorAll('.zoneWrapper .delete');
    bedelettedImages.forEach(deletted=>{
        deletted.onclick=function(){
        this.parentNode.remove();
        }
        })
}

function dragimages(zoneWrapper,file){
    zoneWrapper.addEventListener('dragstart',(e)=>{
    const trashIcon = document.querySelector('.trash');
    trashIcon.classList.add('opamax')
    e.dataTransfer.setData('text',e.target.id)
})

zoneWrapper.addEventListener('dragend',()=>{
    const trashIcon = document.querySelector('.trash');
    trashIcon.classList.remove('opamax')
})
}

function draganddelete(){
    const trashIcon = document.querySelector('.trash');
    trashIcon.addEventListener('dragover',(e)=>{
        e.preventDefault()
    })
    trashIcon.addEventListener('drop',(e)=>{
        e.preventDefault()
       let data= e.dataTransfer.getData('text')
       const elementtoremove = document.getElementById(data);
       elementtoremove.remove()
    })
}


