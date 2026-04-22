using Gestion.Application.Common.Interfaces;
using Gestion.Application.Gastos.Commands.CreateGasto;
using Gestion.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace Gestion.Application.UnitTests.Gastos.Commands.CreateGasto;

public class CreateGastoCommandHandlerTests
{
    private readonly Mock<IApplicationDbContext> _mockContext;
    private readonly Mock<DbSet<Gasto>> _mockDbSet;

    public CreateGastoCommandHandlerTests()
    {
        // 1. Configurar los "Fakes" (Mocks)
        _mockContext = new Mock<IApplicationDbContext>();
        _mockDbSet = new Mock<DbSet<Gasto>>();

        // Simular que cuando alguien llama a context.Gastos, devuelve nuestro DbSet falso
        _mockContext.Setup(c => c.Gastos).Returns(_mockDbSet.Object);
    }

    [Fact]
    public async Task Handle_DebeCrearGasto_CuandoLosDatosSonValidos()
    {
        // ==========================================
        // ARRANGE (Preparar el escenario)
        // ==========================================
        var command = new CreateGastoCommand(
            150.50m, 
            DateTime.UtcNow, 
            "Compra de prueba", 
            Guid.NewGuid(), 
            Guid.NewGuid(), 
            null, 
            null);

        var handler = new CreateGastoCommandHandler(_mockContext.Object);

        // ==========================================
        // ACT (Ejecutar la acción a probar)
        // ==========================================
        var result = await handler.Handle(command, CancellationToken.None);

        // ==========================================
        // ASSERT (Verificar los resultados)
        // ==========================================
        
        // 1. Verificamos que devuelva un ID válido (no un Guid vacío)
        Assert.NotEqual(Guid.Empty, result);

        // 2. Verificamos que el método "Add" del DbSet falso se haya llamado exactamente 1 vez
        _mockDbSet.Verify(m => m.Add(It.IsAny<Gasto>()), Times.Once());

        // 3. Verificamos que el método "SaveChangesAsync" se haya llamado exactamente 1 vez
        _mockContext.Verify(m => m.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once());
    }
}
