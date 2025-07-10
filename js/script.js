window.onscroll = function() {

    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = ( winScroll / height ) * 100;
    document.getElementById( 'bar-progress' ).style.width = scrolled + '%';

}

const navbarNav = document.getElementById( 'navbar-nav' );

document.getElementById( 'menu' ).onclick = () => {

    navbarNav.classList.toggle( 'active' );

};

document.addEventListener( 'click', event => {

    if ( ! document.getElementById( 'menu' ).contains( event.target ) && ! navbarNav.contains( event.target ) ) {

        navbarNav.classList.remove('active');

    }

} );