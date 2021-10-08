const commentForm = document.forms.orderList;
const editForm = document.forms.commEdit;

commentForm?.addEventListener('click', async (event) => {
  if (event.target.tagName === 'BUTTON' && event.target.innerText === 'Delete') {
    const commId = event.target.closest('div').dataset.id;
    const divCard = event.target.closest('div').closest('div');

    const response = await fetch(`/orders/${commId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      divCard.remove();
    }
  }

  if (event.target.tagName === 'BUTTON' && event.target.innerText === 'Edit') {
    const commId = event.target.closest('div').dataset.id;
    window.location.pathname = `/orders/${commId}/edit`;
  }
});

editForm?.addEventListener('click', async (event) => {
  if (event.target.tagName === 'BUTTON' && event.target.innerText === 'Save') {
    const commId = event.target.closest('div').dataset.id;
    const editData = Object.fromEntries(new FormData(editForm));

    const response = await fetch(`/orders/${commId}/edit`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editData),
    });
    if (response.ok) {
      window.location.pathname = '/orders';
    }
  }

  if (event.target.tagName === 'BUTTON' && event.target.innerText === 'Cancel') {
    window.location.pathname = '/orders';
  }
});
